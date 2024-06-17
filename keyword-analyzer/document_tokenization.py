import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import string

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from database import Document, Keyword

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 3))


def preprocess_text(text):
    text = text.lower()

    text = text.translate(str.maketrans('', '', string.punctuation))

    tokens = word_tokenize(text)

    stop_words = set(stopwords.words('english'))
    tokens = [word for word in tokens if word not in stop_words]

    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]

    preprocessed_text = ' '.join(tokens)

    return preprocessed_text


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


def search_documents(session, query):
    preprocessed_query = preprocess_text(query)

    if not preprocessed_query:
        return []

    query_keywords = extract_keywords(preprocessed_query)

    query_vector = vectorize_keywords(query_keywords)

    documents = session.query(Document).all()
    results = []
    for document in documents:
        keywords = session.query(Keyword).filter(Keyword.document_id == document.id).all()
        document_vector = vectorize_keywords([{'keyword': k.keyword, 'score': k.score} for k in keywords])

        similarity = cosine_similarity([query_vector], [document_vector])[0][0]

        if similarity > 0:
            results.append({'document_id': document.id, 'externalId': document.externalId, 'similarity': similarity})

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
