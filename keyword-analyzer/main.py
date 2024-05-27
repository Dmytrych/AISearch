from database import Session as DBSession
from service import store_tfidf_results, get_tfidf_results

def main():
    # Create a new session
    session = DBSession()

    # Example document content
    document_content = "This is a sample text document to demonstrate TF-IDF keyword extraction."

    # Store TF-IDF results for the new document
    document_id = store_tfidf_results(session, document_content)
    print(f"Document ID: {document_id}")

    # Retrieve TF-IDF results for the stored document
    results = get_tfidf_results(session, document_id)
    print("\nRetrieved TF-IDF Results:")
    print(f"Document: {results['document']}")
    print("Keywords:")
    for keyword in results['keywords']:
        print(f"{keyword['keyword']}: {keyword['score']}")

    # Close the session
    session.close()


main()
