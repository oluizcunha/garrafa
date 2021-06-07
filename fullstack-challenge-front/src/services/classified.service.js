import http from '../http-common';

class TutorialDataService {
  getAll() {
    return http.get('/Classifieds');
  }

  get(id) {
    return http.get(`/classifieds/${id}`);
  }

  create(data) {
    return http.post('/classifieds', data);
  }

  update(id, data) {
    return http.put(`/classifieds/${id}`, data);
  }

  delete(id) {
    return http.delete(`/classifieds/${id}`);
  }

  deleteAll() {
    return http.delete(`/classifieds`);
  }

  findByTitle(title) {
    return http.get(`/classifieds?title=${title}`);
  }
}

export default new TutorialDataService();
