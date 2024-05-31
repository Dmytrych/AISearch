import os

from flask import Flask, request, jsonify
from database import Session as DBSession
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

PORT = os.getenv('PORT', '5000')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(PORT))
