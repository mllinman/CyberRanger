; ---------------------------------------
; CyberRanger Installer Script
; ---------------------------------------

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
DisableProgramGroupPage=no
WizardStyle=modern
AllowNoIcons=yes

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

[Run]
Filename: "{app}\CyberRanger.exe"; Description: "Launch CyberRanger"; Flags: nowait postinstall skipifsilent
