import os.path

from PyQt6.QtWidgets import (
    QApplication,
    QDialog,
    QDialogButtonBox,
    QFormLayout,
    QLineEdit,
    QPushButton,
    QVBoxLayout,
    QLabel,
    QGridLayout
)
from PyQt6.QtCore import Qt
from PyQt6.QtGui import QIcon, QFont, QPixmap, QMovie
from os.path import exists
import sys
import main as m

class Window(QDialog):
    def __init__(self):

        super().__init__(parent=None)
        self.setWindowTitle("PaddyPower Scraper")
        self.setGeometry(200, 200, 400, 200)

        self.im = QPixmap('Paddy_Power.png')
        self.label = QLabel()
        self.label.setPixmap(self.im)

        self.button = QPushButton("Get Todays Football Odds")
        self.button.clicked.connect(self.getfootball)

        self.bballbutton = QPushButton("Get Todays Basketball Odds")
        self.bballbutton.clicked.connect(self.getbball)

        self.grid = QGridLayout()
        self.grid.addWidget(self.label, 1, 1)
        self.grid.addWidget(self.button)
        self.grid.addWidget(self.bballbutton)
        self.setLayout(self.grid)


        self.results = QPushButton("Show results")
        self.grid.addWidget(self.results)
        self.results.hide()
        self.results.clicked.connect(self.finalState)

        self.exit = QPushButton("Exit")
        self.grid.addWidget(self.exit)
        self.exit.hide()
        self.exit.clicked.connect(self.terminate)
        
    def terminate(self):
        sys.exit(app.exec())

    def finalState(self):
        self.results.hide()
        self.exit.show()
        self.finalimg = QPixmap('finalimg.png')
        self.final_lbl = QLabel()
        self.final_lbl.setPixmap(self.finalimg)
        self.grid.addWidget(self.final_lbl, 1, 1)

    def getbball(self):

        basketball = m.Setting('basketball')
        basketball.setUp()
        basketball.getJson()
        basketball.urlBuild()
        basketball.generateJson()
        outball = basketball.nbascrape()
        print(outball)

        basketball.writeToExcel(outball)
        self.finalState()

    def getfootball(self):

        football = m.Setting('football')
        football.setUp()
        football.getJson()
        football.urlBuild()
        football.generateJson()
        out = football.scraper()
        print(out)
        football.writeToExcel(out)
        self.finalState()


# main method
if __name__ == '__main__':
    # create pyqt5 app
    app = QApplication([])
    window = Window()
    window.show()
    sys.exit(app.exec())

