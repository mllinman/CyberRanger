# Contributing to CyberRanger

Thank you for your interest in contributing to CyberRanger! This document provides guidelines and information for contributors.

## 🚨 Important Legal Notice

**Before contributing, please understand that CyberRanger is a penetration testing tool intended EXCLUSIVELY for authorized security testing and research.** All contributions must align with ethical security practices and legal compliance.

## 🤝 How to Contribute

### 1. Getting Started
1. Fork the repository on GitHub
2. Clone your fork locally: `git clone https://github.com/YOUR_USERNAME/CyberRanger.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Set up the development environment following the [README](README.md) instructions

### 2. Development Guidelines

#### Code Standards
- **Language**: C++ with Qt6 framework
- **Style**: Follow Qt coding conventions
- **Documentation**: Comment complex security-related functions
- **Testing**: Test all scanner modules thoroughly
- **Legal Compliance**: Ensure all new features include appropriate disclaimers

#### Security-Specific Guidelines
- **Ethical Focus**: All features must support authorized penetration testing only
- **Legal Disclaimers**: Include warnings for potentially sensitive functionality
- **Safe Defaults**: Scanner modules should default to non-intrusive behavior
- **Permission Checks**: Validate user authorization before executing scans
- **Error Handling**: Provide clear feedback for permission/access issues

### 3. Types of Contributions

#### 🐛 Bug Reports
- Use the GitHub issue template
- Provide detailed reproduction steps
- Include system information (OS, Qt version, etc.)
- **Security Issues**: Report privately to maintainers first

#### 💡 Feature Requests  
- Describe the security testing use case
- Explain how it supports authorized penetration testing
- Consider legal and ethical implications
- Provide implementation suggestions if possible

#### 🔧 Code Contributions
- **Scanner Modules**: New network/wireless scanning capabilities
- **UI Improvements**: Enhanced dark theme, better UX
- **Platform Support**: Cross-platform compatibility improvements
- **Documentation**: Usage guides, security best practices

### 4. Development Process

#### Before Submitting
```bash
# Build and test
./build_linux.sh  # Linux
build_windows.bat # Windows

# Run the application
./release/CyberRanger

# Test all scanner modules
# Verify legal disclaimer functionality
# Check UI responsiveness and theming
```

#### Pull Request Process
1. **Clear Description**: Explain the change and its security purpose
2. **Testing**: Demonstrate that features work as intended
3. **Legal Review**: Confirm compliance with ethical security practices
4. **Documentation**: Update README or other docs if needed
5. **Small Changes**: Keep PRs focused and reviewable

### 5. Coding Standards

#### Qt6 & C++ Best Practices
```cpp
// Use Qt naming conventions
class NetworkScanner : public QObject {
    Q_OBJECT
public:
    explicit NetworkScanner(QWidget *parent = nullptr);
    
    // Always include legal compliance checks
    bool hasPermission() const;
    void showLegalDisclaimer();
    
private:
    // Document security-sensitive functions
    void performAuthorizedScan();
};
```

#### UI Development
- **Dark Theme**: Maintain consistency with existing theme
- **Accessibility**: Support various screen sizes and accessibility needs  
- **User Feedback**: Provide clear status messages and error handling
- **Professional Design**: Keep the security tool aesthetic

### 6. Security & Legal Considerations

#### Required for All Contributions
- **Legal Disclaimer**: Include appropriate warnings for security tools
- **Authorized Use**: Clearly indicate intended use for legitimate security testing
- **Permission Validation**: Check user authorization before executing scans
- **Safe Defaults**: Non-intrusive behavior by default

#### Prohibited Contributions
- ❌ Features designed for unauthorized access
- ❌ Exploits without clear defensive purpose
- ❌ Tools that could facilitate illegal activities
- ❌ Code that bypasses security measures maliciously

### 7. Community Guidelines

#### Communication
- **Respectful**: Professional and courteous interaction
- **Security-Focused**: Keep discussions centered on legitimate security research
- **Educational**: Share knowledge and best practices
- **Legal Awareness**: Understand and respect applicable laws

#### Code of Conduct
- Follow ethical hacking principles
- Respect others' work and opinions
- Provide constructive feedback
- Help maintain a welcoming community for security professionals

## 📞 Getting Help

### Development Support
- **Build Issues**: Check [BUILD_README.md](BUILD_README.md)
- **Qt Questions**: Refer to [Qt Documentation](https://doc.qt.io/)
- **Security Practices**: Follow OWASP guidelines
- **Legal Questions**: Consult with appropriate legal counsel

### Contact Maintainers
- **General Questions**: Open a GitHub discussion
- **Security Issues**: Email maintainers privately
- **Feature Planning**: Use GitHub issues with enhancement label

## 🎯 Contribution Areas

### High Priority
- [ ] Enhanced network scanning modules
- [ ] Cross-platform compatibility improvements  
- [ ] Professional UI/UX enhancements
- [ ] Comprehensive documentation
- [ ] Security best practices integration

### Medium Priority  
- [ ] Additional export formats
- [ ] Plugin architecture development
- [ ] Performance optimizations
- [ ] Automated testing framework

### Documentation Needed
- [ ] Advanced usage tutorials
- [ ] Security assessment workflows
- [ ] Legal compliance guides
- [ ] API documentation

## 🏆 Recognition

Contributors will be recognized in:
- Repository README acknowledgments
- Release notes for significant contributions
- Community hall of fame for ongoing contributors

---

Thank you for contributing to CyberRanger and supporting the ethical security research community! 🛡️