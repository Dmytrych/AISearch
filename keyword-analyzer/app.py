from flask import Flask, request, jsonify
from database import Session as DBSession
from service import store_tfidf_results, get_tfidf_results

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_document():
    data = request.json
    document_content = data.get('content')

    if not document_content:
        return jsonify({'error': 'No content provided'}), 400

    session = DBSession()

    document_id = store_tfidf_results(session, document_content)

    results = get_tfidf_results(session, document_id)

    session.close()

    return jsonify(results)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
