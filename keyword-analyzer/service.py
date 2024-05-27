# service.py

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from database import Session, Document, Keyword

# Initialize the TF-IDF vectorizer
vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 3))


def store_tfidf_results(session, document_content):
    # Add the new document to the database
    document = Document(content=document_content)
    session.add(document)
    session.commit()

    # Transform the new document to get TF-IDF scores
    tfidf_matrix = vectorizer.fit_transform([document_content])
    tfidf_scores = tfidf_matrix.toarray().flatten()
    feature_names = vectorizer.get_feature_names_out()

    # Get the top N keywords
    N = 10
    top_indices = np.argsort(tfidf_scores)[-N:][::-1]
    top_keywords = [(feature_names[i], tfidf_scores[i]) for i in top_indices]

    # Store the keywords in the database
    for keyword, score in top_keywords:
        keyword_entry = Keyword(document_id=document.id, keyword=keyword, score=score)
        session.add(keyword_entry)

    session.commit()
    return document.id


def get_tfidf_results(session, document_id):
    document = session.query(Document).filter(Document.id == document_id).first()
    if not document:
        return None

    keywords = session.query(Keyword).filter(Keyword.document_id == document_id).all()
    return {
        'document': document.content,
        'keywords': [{'keyword': k.keyword, 'score': k.score} for k in keywords]
    }


# Example usage
if __name__ == '__main__':
    # Create a new session
    session = Session()

    # Store TF-IDF results for a new document
    document_content = "Text of the new incoming document"
    document_id = store_tfidf_results(session, document_content)
    print(f"Document ID: {document_id}")

    # Retrieve TF-IDF results for the document
    results = get_tfidf_results(session, document_id)
    print(results)

    # Close the session
    session.close()
