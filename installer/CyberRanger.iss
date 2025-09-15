; ===============================================
; CyberRanger Network Security Scanner Installer
; ===============================================

[Setup]
AppName=CyberRanger
AppVerName=CyberRanger Network Security Scanner 1.0.0
AppVersion=1.0.0
AppPublisher=CyberRanger Development Team
AppPublisherURL=https://github.com/mllinman/CyberRanger
AppSupportURL=https://github.com/mllinman/CyberRanger/issues
AppUpdatesURL=https://github.com/mllinman/CyberRanger/releases
DefaultDirName={autopf}\CyberRanger
DefaultGroupName=CyberRanger
UninstallDisplayIcon={app}\CyberRanger.exe
UninstallDisplayName=CyberRanger Network Security Scanner
Compression=lzma2/ultra64
InternalCompressLevel=ultra64
SolidCompression=yes
OutputDir=..\release
OutputBaseFilename=CyberRanger_Setup_v1.0.0
SetupIconFile=..\assets\app_icon.ico
DisableProgramGroupPage=no
DisableReadyPage=no
WizardStyle=modern
WizardSizePercent=100
AllowNoIcons=yes
PrivilegesRequired=admin
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64

; Minimum Windows version
MinVersion=6.1sp1

[Languages]
Name: "english"; MessagesFile: "compiler:Default.isl"

[Tasks]
Name: "desktopicon"; Description: "Create a &desktop icon"; GroupDescription: "Additional icons:"; Flags: unchecked
Name: "quicklaunchicon"; Description: "Create a &Quick Launch icon"; GroupDescription: "Additional icons:"; OnlyBelowVersion: 6.1; Flags: unchecked

[Types]
Name: "full"; Description: "Full installation"
Name: "compact"; Description: "Compact installation"

[Components]
Name: "main"; Description: "CyberRanger Core Application"; Types: full compact; Flags: fixed
Name: "docs"; Description: "Documentation"; Types: full

[Files]
; Main executable
Source: "..\build_windows\Release\CyberRanger.exe"; DestDir: "{app}"; Flags: ignoreversion; Components: main

; Qt DLLs (deployed by windeployqt)
Source: "..\build_windows\Release\*.dll"; DestDir: "{app}"; Flags: ignoreversion; Components: main
Source: "..\build_windows\Release\platforms\*"; DestDir: "{app}\platforms"; Flags: recursesubdirs ignoreversion; Components: main
Source: "..\build_windows\Release\styles\*"; DestDir: "{app}\styles"; Flags: recursesubdirs ignoreversion; Components: main

; Resources and assets
Source: "..\assets\*"; DestDir: "{app}\assets"; Flags: recursesubdirs ignoreversion; Components: main
Source: "..\resources\*"; DestDir: "{app}\resources"; Flags: recursesubdirs ignoreversion; Components: main
Source: "..\modules\*"; DestDir: "{app}\modules"; Flags: recursesubdirs ignoreversion; Components: main

; Configuration files
Source: "..\config\*"; DestDir: "{app}\config"; Flags: recursesubdirs ignoreversion; Components: main

; Documentation
Source: "..\README.md"; DestDir: "{app}"; Flags: ignoreversion; Components: docs
Source: "..\BUILD_README.md"; DestDir: "{app}"; Flags: ignoreversion; Components: docs
Source: "..\LICENSE"; DestDir: "{app}"; Flags: ignoreversion; Components: docs

; Visual C++ Redistributable (if needed)
Source: "vcredist_x64.exe"; DestDir: "{tmp}"; Flags: deleteafterinstall; Check: VCRedistNeedsInstall

[Icons]
Name: "{group}\CyberRanger"; Filename: "{app}\CyberRanger.exe"; Comment: "Network Security Scanner"
Name: "{group}\Uninstall CyberRanger"; Filename: "{uninstallexe}"
Name: "{userdesktop}\CyberRanger"; Filename: "{app}\CyberRanger.exe"; Tasks: desktopicon; Comment: "Network Security Scanner"
Name: "{userappdata}\Microsoft\Internet Explorer\Quick Launch\CyberRanger"; Filename: "{app}\CyberRanger.exe"; Tasks: quicklaunchicon

[Run]
Filename: "{tmp}\vcredist_x64.exe"; Parameters: "/quiet"; Check: VCRedistNeedsInstall; StatusMsg: "Installing Visual C++ Redistributable..."
Filename: "{app}\CyberRanger.exe"; Description: "{cm:LaunchProgram,CyberRanger}"; Flags: nowait postinstall skipifsilent

[UninstallDelete]
Type: filesandordirs; Name: "{app}\logs"
Type: files; Name: "{app}\config\*.log"

[Code]
function VCRedistNeedsInstall: Boolean;
begin
  Result := not RegKeyExists(HKLM, 'SOFTWARE\Microsoft\VisualStudio\14.0\VC\Runtimes\x64');
end;

[Messages]
BeveledLabel=CyberRanger Network Security Scanner v1.0.0
