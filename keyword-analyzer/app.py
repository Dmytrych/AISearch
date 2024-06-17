import os
from flask import Flask, request, jsonify
from database import Session as DBSession, Document, Keyword
from service import store_tfidf_results, get_tfidf_results, search_documents, extract_keywords_service_call

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_document():
    data = request.json
    document_content = data.get('content')

    if not document_content:
        return jsonify({'error': 'No content provided'}), 400

    # Extract keywords without saving
    response = extract_keywords_service_call(document_content)

    return jsonify(response)

@app.route('/store', methods=['POST'])
def store_document():
    data = request.json
    document_content = data.get('content')
    application_id = data.get('applicationId')

    if not document_content:
        return jsonify({'error': 'No content provided'}), 400

    session = DBSession()

    document_id = store_tfidf_results(session, document_content, application_id)

    results = get_tfidf_results(session, document_id)

    session.close()

    return jsonify(results)

@app.route('/search', methods=['POST'])
def search():
    data = request.json
    query = data.get('query')

    if not query:
        return jsonify({'error': 'No query provided'}), 400

    # Create a new session
    session = DBSession()

    # Search for documents matching the query
    results = search_documents(session, query)

    # Close the session
    session.close()

    return jsonify(results)

def remove_document_by_externalId(session, externalId):
    # Find the document by externalId
    document = session.query(Document).filter(Document.externalId == externalId).first()
    if not document:
        return False

    # Delete keywords associated with the document
    session.query(Keyword).filter(Keyword.document_id == document.id).delete()

    # Delete the document
    session.delete(document)
    session.commit()
    return True

@app.route('/remove', methods=['POST'])
def remove_document():
    data = request.json
    externalId = data.get('externalId')

    if not externalId:
        return jsonify({'error': 'No externalId provided'}), 400

    session = DBSession()

    # Remove the document by externalId
    success = remove_document_by_externalId(session, externalId)

    session.close()

    if not success:
        return jsonify({'error': 'Document not found'}), 404

    return jsonify({'message': 'Document removed successfully'})

PORT = os.getenv('PORT', '5000')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(PORT))
