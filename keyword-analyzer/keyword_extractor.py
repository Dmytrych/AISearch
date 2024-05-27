import nltk
from nltk.util import ngrams
from collections import Counter
import string
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
import spacy

nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

# Load and preprocess the text
def load_and_preprocess(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        text = file.read()
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation))
    return text


# Tokenize the text
def tokenize(text):
    tokens = nltk.word_tokenize(text)
    return tokens


# Remove stop words
def remove_stopwords(tokens):
    stop_words = set(stopwords.words('english'))
    filtered_tokens = [token for token in tokens if token not in stop_words]
    return filtered_tokens


# Lemmatize the tokens
def lemmatize(tokens):
    lemmatizer = WordNetLemmatizer()
    lemmatized_tokens = [lemmatizer.lemmatize(token) for token in tokens]
    return lemmatized_tokens


# Generate N-grams
def generate_ngrams(tokens, min_n, max_n):
    all_ngrams = []
    for n in range(min_n, max_n + 1):
        n_grams = ngrams(tokens, n)
        all_ngrams.extend(n_grams)
    return all_ngrams


# Count the frequency of N-grams
def count_ngrams(ngrams):
    ngram_counts = Counter(ngrams)
    return ngram_counts


# Extract named entities
def extract_named_entities(text):
    nlp = spacy.load('en_core_web_sm')
    doc = nlp(text)
    entities = [entity.text for entity in doc.ents]
    return entities


# Extract keywords from N-grams
def extract_keywords(ngram_counts, num_keywords):
    most_common_ngrams = ngram_counts.most_common(num_keywords)
    return most_common_ngrams


# Main function
def main(file_path, min_n, max_n, num_keywords):
    text = load_and_preprocess(file_path)
    tokens = tokenize(text)
    tokens = remove_stopwords(tokens)
    tokens = lemmatize(tokens)
    n_grams = generate_ngrams(tokens, min_n, max_n)
    ngram_counts = count_ngrams(n_grams)
    keywords = extract_keywords(ngram_counts, num_keywords)

    named_entities = extract_named_entities(text)

    print("Top N-gram Keywords:")
    for keyword, frequency in keywords:
        print(' '.join(keyword), ':', frequency)

    print("\nNamed Entities:")
    for entity in named_entities:
        print(entity)


# Example usage
file_path = 'testfile.txt'
min_n = 1
max_n = 3
num_keywords = 10
main(file_path, min_n, max_n, num_keywords)
