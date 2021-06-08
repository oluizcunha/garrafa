import http from '../utils/http-common';

class TutorialDataService {
  getAll() {
    return http.get('/Classifieds');
  }

  create(data) {
    return http.post('/Classified', data);
  }
}

export default new TutorialDataService();
