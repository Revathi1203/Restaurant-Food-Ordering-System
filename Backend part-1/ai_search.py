from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load AI model only once
model = SentenceTransformer("all-MiniLM-L6-v2")


def search_menu(query, menu_items):

    # Build searchable text for every menu item
    menu_texts = []

    for item in menu_items:

        text = f"""
        {item.name}
        {item.description}
        {item.category}
        {'vegetarian' if item.vegetarian else ''}
        {'non vegetarian' if item.non_vegetarian else ''}
        {'spicy' if item.spicy else ''}
        """

        menu_texts.append(text)

    # Convert menu items into embeddings
    menu_embeddings = model.encode(menu_texts)

    # Convert user query into embedding
    query_embedding = model.encode([query])

    # Calculate similarity
    similarities = cosine_similarity(
        query_embedding,
        menu_embeddings
    )[0]

    results = []

    for score, item in zip(similarities, menu_items):

        # Ignore unavailable dishes
        if not item.available:
            continue

        results.append({
            "id": item.id,
            "name": item.name,
            "description": item.description,
            "category": item.category,
            "price": item.price,
            "vegetarian": item.vegetarian,
            "non_vegetarian": item.non_vegetarian,
            "spicy": item.spicy,
            "available": item.available,
            "match_score": round(float(score), 3)
        })

    # Highest score first
    results.sort(
        key=lambda x: x["match_score"],
        reverse=True
    )

    return results