; -------------------------------------------------
; CyberRanger Branded Installer Script
; -------------------------------------------------

[Setup]
AppName=CyberRanger
AppVersion=1.0.0
DefaultDirName={pf}\CyberRanger
DefaultGroupName=CyberRanger
UninstallDisplayIcon={app}\CyberRanger.exe
Compression=lzma
SolidCompression=yes
OutputDir=.
OutputBaseFilename=CyberRanger_Installer
WizardStyle=modern
AllowNoIcons=yes
WizardImageFile=logo.bmp
WizardSmallImageFile=logo.bmp

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a &desktop icon"; GroupDescription: "Additional icons:"; Flags: unchecked

[Files]
; Main executable
Source: "CyberRanger.exe"; DestDir: "{app}"; Flags: ignoreversion

; Modules and assets
Source: "modules\*"; DestDir: "{app}\modules"; Flags: recursesubdirs ignoreversion
Source: "assets\*"; DestDir: "{app}\assets"; Flags: recursesubdirs ignoreversion

; README
Source: "README.md"; DestDir: "{app}"; Flags: ignoreversion

; Qt DLLs
Source: "QtDLLs\*"; DestDir: "{app}"; Flags: recursesubdirs ignoreversion

[Icons]
Name: "{group}\CyberRanger"; Filename: "{app}\CyberRanger.exe"
Name: "{userdesktop}\CyberRanger"; Filename: "{app}\CyberRanger.exe"; Tasks: desktopicon

; -------------------------------------------------
; Custom pages for License / Disclaimer
; -------------------------------------------------
[Code]
var
  DisclaimerPage: TInputQueryWizardPage;

procedure InitializeWizard();
begin
  DisclaimerPage := CreateInputQueryPage(wpWelcome, 'CyberRanger Disclaimer', 
    'Please acknowledge before using:', 
    'CyberRanger is a penetration testing tool intended for ethical use only. By using this software, you agree to use it responsibly and legally on networks you own or have explicit permission to test.');
  DisclaimerPage.Add('Type YES to acknowledge:', False);
end;

function NextButtonClick(CurPageID: Integer): Boolean;
begin
  if CurPageID = DisclaimerPage.ID then
  begin
    if Trim(DisclaimerPage.Values[0]) <> 'YES' then
    begin
      MsgBox('You must type YES to acknowledge the disclaimer before continuing.', mbError, MB_OK);
      Result := False;
      exit;
    end;
  end;
  Result := True;
end;

[Run]
Filename: "{app}\CyberRanger.exe"; Description: "Launch CyberRanger"; Flags: nowait postinstall skipifsilent
