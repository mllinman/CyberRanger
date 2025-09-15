#ifndef PACKETCAPTURETAB_H
#define PACKETCAPTURETAB_H

#include <QWidget>
#include <QVBoxLayout>
#include <QTextEdit>
#include <QPushButton>
#include <QLabel>

class PacketCaptureTab : public QWidget
{
    Q_OBJECT

public:
    explicit PacketCaptureTab(QWidget *parent = nullptr);

private slots:
    void startCapture();
    void stopCapture();
    void clearCapture();

private:
    QTextEdit *captureOutput;
    QPushButton *startBtn;
    QPushButton *stopBtn;
    QPushButton *clearBtn;
    QLabel *statusLabel;
    bool capturing;
};

#endif // PACKETCAPTURETAB_H