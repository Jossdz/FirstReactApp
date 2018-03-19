const api = {

  async getArticlesBySource(sourceId){
    const response = await fetch(`https://newsapi.org/v1/articles?source=${sourceId}&apiKey=d2bad5a13a2a4f99861d9c3ca6dbbc4d`);
    return await response.json();
  },
  async getSources(){
    const response= await fetch("https://newsapi.org/v1/sources?language=en");
    return await response.json();
  }
}
export default api;