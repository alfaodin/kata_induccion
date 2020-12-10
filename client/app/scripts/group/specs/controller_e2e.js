'use strict';

describe('game of life pre config cell', function () {
  it('should load the ONE cell configuration', function () {
    browser.get('http://localhost:3000/#/group');

    element(by.id('one_cell_pre_config_btn')).click();

    var rowsContainer = element.all(by.css('.row-container'));
    expect(rowsContainer.count()).toBe(4);

    var colsContainer = element.all(by.css('.col-container'));
    expect(colsContainer.count()).toBe(16);

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(1);
  });

  it('should load the BLOCK cell configuration', function () {
    browser.get('http://localhost:3000/#/group');

    element(by.id('block_pre_config_btn')).click();

    var rowsContainer = element.all(by.css('.row-container'));
    expect(rowsContainer.count()).toBe(4);

    var colsContainer = element.all(by.css('.col-container'));
    expect(colsContainer.count()).toBe(16);

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(4);
  });

  it('should load the OCILATOR cell configuration', function () {
    browser.get('http://localhost:3000/#/group');

    element(by.id('ocilator_pre_config_btn')).click();

    var rowsContainer = element.all(by.css('.row-container'));
    expect(rowsContainer.count()).toBe(4);

    var colsContainer = element.all(by.css('.col-container'));
    expect(colsContainer.count()).toBe(16);

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(3);
  });

  it('should load the GLITER cell configuration', function () {
    browser.get('http://localhost:3000/#/group');

    element(by.id('glitter_pre_config_btn')).click();

    var rowsContainer = element.all(by.css('.row-container'));
    expect(rowsContainer.count()).toBe(4);

    var colsContainer = element.all(by.css('.col-container'));
    expect(colsContainer.count()).toBe(16);

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(5);
  });
});

describe('game of life user iteration', function () {
  it('should load empty board', function () {
    browser.get('http://localhost:3000/#/group');

    var rowsContainer = element.all(by.css('.row-container'));
    expect(rowsContainer.count()).toBe(10);

    var colsContainer = element.all(by.css('.col-container'));
    expect(colsContainer.count()).toBe(100);

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(0);
  });

  it('should interact with one cell and active it', function () {
    browser.get('http://localhost:3000/#/group');

    element.all(by.className('col-container')).get(0).click();

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(1);
  });

  it('should interact with all cells and active it all', function () {
    browser.get('http://localhost:3000/#/group');

    var colList = element.all(by.className('col-container'));
    colList.each(function (colElement, colIndex) {
      colList.get(colIndex).click();
    });

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(100);
  });

  it('should active one cell and then run one iteration', function () {
    browser.get('http://localhost:3000/#/group');

    element.all(by.className('col-container')).get(0).click();

    element(by.id('next_generation_btn')).click();

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(0);
  });

  it('should active one cell and then run reset', function () {
    browser.get('http://localhost:3000/#/group');

    element.all(by.className('col-container')).get(0).click();

    element(by.id('reset_world_btn')).click();

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(0);
  });

  it('should active some cell then run Automatic Generation', function () {
    browser.get('http://localhost:3000/#/group');

    element.all(by.className('col-container')).get(14).click();
    element.all(by.className('col-container')).get(23).click();
    element.all(by.className('col-container')).get(24).click();
    element.all(by.className('col-container')).get(25).click();

    element(by.id('auto_generation_btn')).click();

    browser.sleep(4000);

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(8);
  });

});

describe('game of life use of History', function () {
  it('should have elements at the history after user interaction', function () {
    browser.get('http://localhost:3000/#/group');

    element.all(by.className('col-container')).get(0).click();
    element.all(by.className('col-container')).get(1).click();

    var historyElements = element.all(by.className('history-item-content'));
    expect(historyElements.count()).toBe(3);
  });

  it('should set an iteration of the history', function () {
    browser.get('http://localhost:3000/#/group');

    element.all(by.className('col-container')).get(0).click();
    element.all(by.className('col-container')).get(1).click();

    element.all(by.className('history-item-content')).get(1).click();

    var aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(1);

    element.all(by.className('history-item-content')).get(2).click();

    aliveCellsElement = element.all(by.className('live'));
    expect(aliveCellsElement.count()).toBe(0);
  });
});
