import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import string

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from database import Document, Keyword

vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 3))


def preprocess_text(text):
    # Convert to lowercase
    text = text.lower()

    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))

    # Tokenize the text
    tokens = word_tokenize(text)

    # Remove stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]

    # Lemmatize the tokens
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    # Join tokens back into a string
    preprocessed_text = ' '.join(tokens)

    return preprocessed_text


def store_tfidf_results(session, document_content, externalId):
    document = Document(content=document_content, externalId=externalId)
    session.add(document)
    session.commit()

    tfidf_matrix = vectorizer.fit_transform([document_content])
    tfidf_scores = tfidf_matrix.toarray().flatten()
    feature_names = vectorizer.get_feature_names_out()

    N = 100
    top_indices = np.argsort(tfidf_scores)[-N:][::-1]
    top_keywords = [(feature_names[i], tfidf_scores[i]) for i in top_indices]

    for keyword, score in top_keywords:
        keyword_entry = Keyword(document_id=document.id, keyword=keyword, score=score)
        session.add(keyword_entry)

    session.commit()
    return document.id


def extract_keywords_service_call(document):
    preprocessed_text = preprocess_text(document)
    keywords = extract_keywords(preprocessed_text)
    return {'document': preprocessed_text, 'keywords': keywords}

def extract_keywords(preprocessed_text):
    tfidf_matrix = vectorizer.fit_transform([preprocessed_text])
    tfidf_scores = tfidf_matrix.toarray().flatten()
    feature_names = vectorizer.get_feature_names_out()

    N = 30
    top_indices = np.argsort(tfidf_scores)[-N:][::-1]
    top_keywords = [{'keyword': feature_names[i], 'score': tfidf_scores[i]} for i in top_indices]

    return top_keywords


def get_tfidf_results(session, document_id):
    document = session.query(Document).filter(Document.id == document_id).first()
    if not document:
        return None

    keywords = session.query(Keyword).filter(Keyword.document_id == document_id).all()
    return {
        'document': document.content,
        'keywords': [{'keyword': k.keyword, 'score': k.score} for k in keywords]
    }


def search_documents(session, query):
    documents = session.query(Document).all()

    # Extract keywords for the query
    preprocessed_query = preprocess_text(query)
    query_keywords = extract_keywords(preprocessed_query)

    # Vectorize query keywords
    query_vector = vectorize_keywords(query_keywords)

    results = []
    for document in documents:
        # Get stored keywords for the document
        keywords = session.query(Keyword).filter(Keyword.document_id == document.id).all()
        document_vector = vectorize_keywords([{'keyword': k.keyword, 'score': k.score} for k in keywords])

        # Calculate cosine similarity between query and document vectors
        similarity = cosine_similarity([query_vector], [document_vector])[0][0]
        results.append({'document_id': document.id, 'externalId': document.externalId, 'similarity': similarity})

    # Get the top N most similar documents
    N = 100
    results = sorted(results, key=lambda x: x['similarity'], reverse=True)[:N]

    return results


def vectorize_keywords(keywords):
    keyword_dict = {k['keyword']: k['score'] for k in keywords}
    features = vectorizer.get_feature_names_out()
    vector = np.zeros(len(features))
    for i, feature in enumerate(features):
        if feature in keyword_dict:
            vector[i] = keyword_dict[feature]
    return vector

