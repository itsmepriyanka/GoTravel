// Cosine similarity function
export function cosineSimilarity(vecA: number[], vecB: number[]): number {
    const dotProduct = vecA.reduce((sum, val, i) => sum + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, val) => sum + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, val) => sum + val * val, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  }
  
  // TF-IDF implementation
  export function tfIdf(docs: string[]): Record<number, Record<string, number>> {
    const tfidf: Record<number, Record<string, number>> = {};
    const termFrequency: Record<number, Record<string, number>> = {};
    const documentFrequency: Record<string, number> = {};
    const totalDocs = docs.length;
  
    docs.forEach((doc, index) => {
      const words = doc.split(/\s+/);
      termFrequency[index] = {};
  
      words.forEach(word => {
        termFrequency[index][word] = (termFrequency[index][word] || 0) + 1;
        documentFrequency[word] = (documentFrequency[word] || 0) + 1;
      });
    });
  
    Object.keys(documentFrequency).forEach(word => {
      Object.keys(termFrequency).forEach(docIndex => {
        tfidf[+docIndex] = tfidf[+docIndex] || {};
        const tf = (termFrequency[+docIndex][word] || 0) / Object.keys(termFrequency[+docIndex]).length;
        const idf = Math.log(totalDocs / (documentFrequency[word] || 1));
        tfidf[+docIndex][word] = tf * idf;
      });
    });
  
    return tfidf;
  }
  