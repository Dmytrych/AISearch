import numpy as np
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import string

from sklearn.feature_extraction.text import TfidfVectorizer
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


def get_tfidf_results(session, document_id):
    document = session.query(Document).filter(Document.id == document_id).first()
    if not document:
        return None

    keywords = session.query(Keyword).filter(Keyword.document_id == document_id).all()
    return {
        'document': document.content,
        'keywords': [{'keyword': k.keyword, 'score': k.score} for k in keywords]
    }
