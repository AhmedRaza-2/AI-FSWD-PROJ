import re
import joblib
import pandas as pd
from urllib.parse import urlparse
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, accuracy_score
from sklearn.preprocessing import StandardScaler
from scipy.sparse import csr_matrix, hstack
from sentence_transformers import SentenceTransformer

### ---------- 1. Load Email Data (phishing_data.json) ----------
df = pd.read_json("phishing_data.json", lines=True)
df['label'] = df['label'].astype(int)  # Make sure labels are int

# Combine subject + body into one text field
df['full_text'] = df['subject'].fillna('') + ' ' + df['body'].fillna('')

# Clean text (lowercase, alphanumeric only)
def clean(text):
    if isinstance(text, str):
        text = text.lower()
        return ''.join(c for c in text if c.isalnum() or c == ' ')
    return ''

df['cleaned_text'] = df['full_text'].apply(clean)

### ---------- 2. Text Embeddings ----------
embedder = SentenceTransformer('all-MiniLM-L6-v2')
X_text = embedder.encode(df['cleaned_text'].tolist(), show_progress_bar=True)
X_text = csr_matrix(X_text)

### ---------- 3. Sender Domain Features ----------
def extract_domain(sender):
    try:
        match = re.search(r'<(.+?)>', sender)
        domain = match.group(1).split('@')[-1] if match else ''
        return domain.lower()
    except:
        return ''

df['sender_domain'] = df['sender'].apply(extract_domain)
sender_dummies = pd.get_dummies(df['sender_domain']).astype(int)
X_sender = csr_matrix(sender_dummies.values)

### ---------- 4. Combine Text + Sender Features (No URL!) ----------
X_combined = hstack([X_text, X_sender])
y = df['label']

# Train/test split
X_train, X_test, y_train, y_test = train_test_split(X_combined, y, test_size=0.2, random_state=42)

# Train the phishing detection model
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Print results
print(f"\n✅ Email Model Accuracy: {accuracy_score(y_test, y_pred):.4f}")
print("\n📊 Email Classification Report:\n", classification_report(y_test, y_pred))

### ---------- 5. Train URL-Based Model Separately ----------
url_df = pd.read_csv("urls.csv")
url_df.columns = ['url', 'label']  
url_df['label'] = url_df['label'].map({'bad': 1, 'good': 0})  # Convert to binary
url_df.dropna(inplace=True)

# Extract URL features
def extract_url_features(url):
    try:
        parsed = urlparse("http://" + str(url))
        domain = parsed.netloc.lower()
    except:
        domain = ''
    return [
        len(str(url)),
        sum(c.isdigit() for c in str(url)),
        sum(str(url).count(c) for c in ['-', '@', '?', '&', '=', '_', '%', '/']),
        1 if re.search(r'\d+\.\d+\.\d+\.\d+', str(url)) else 0,
        len(domain.split('.')[-1]) if '.' in domain else 0
    ]

url_df['features'] = url_df['url'].apply(extract_url_features)
X_url = StandardScaler().fit_transform(url_df['features'].tolist())
y_url = url_df['label']

# Train/test split
X_u_train, X_u_test, y_u_train, y_u_test = train_test_split(X_url, y_url, test_size=0.2, random_state=42)

# Train the URL model
url_model = RandomForestClassifier(n_estimators=100, random_state=42)
url_model.fit(X_u_train, y_u_train)
y_url_pred = url_model.predict(X_u_test)

# Print results
print(f"\n🌐 URL Model Accuracy: {accuracy_score(y_u_test, y_url_pred):.4f}")
print("\n🌐 URL Classification Report:\n", classification_report(y_u_test, y_url_pred))

### ---------- 6. Save All Models ----------
joblib.dump(model, 'phishing_model.joblib')
joblib.dump(sender_dummies.columns.tolist(), 'sender_columns.joblib')
joblib.dump(embedder, 'sentence_embedder.joblib')
joblib.dump(url_model, 'url_phishing_model.joblib')

print("\n📦 Models saved successfully.")