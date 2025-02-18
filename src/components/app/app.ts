import AppController from '../controller/controller';
import { AppView } from '../view/appView';

interface AppInterface {
    controller: AppController;
    view: AppView;
    start(): void;
}

class App implements AppInterface {
    controller;
    view;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start() {
        document
            .querySelector('.sources')!
            .addEventListener('click', (e) => this.controller.getNews(e, (data) => this.view.drawNews(data)));
        this.controller.getSources((data) => this.view.drawSources(data));
    }
}

export default App;
