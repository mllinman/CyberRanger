#!/usr/bin/env python3
"""
File integrity and syntax checker for CyberRanger C++ project
"""

import os
import sys
import subprocess
import hashlib
import json
from pathlib import Path

def check_file_integrity(base_path):
    """Check file integrity using checksums"""
    integrity_report = {}
    
    # Find all source files
    source_extensions = ['.cpp', '.h', '.hpp', '.c']
    source_files = []
    
    for ext in source_extensions:
        source_files.extend(Path(base_path).rglob(f'*{ext}'))
    
    for file_path in source_files:
        try:
            with open(file_path, 'rb') as f:
                content = f.read()
                checksum = hashlib.sha256(content).hexdigest()
                integrity_report[str(file_path)] = {
                    'checksum': checksum,
                    'size': len(content),
                    'exists': True
                }
        except Exception as e:
            integrity_report[str(file_path)] = {
                'error': str(e),
                'exists': False
            }
    
    return integrity_report

def check_cpp_syntax(file_path):
    """Check C++ syntax using g++"""
    try:
        # Basic syntax check without linking
        result = subprocess.run([
            'g++', '-std=c++17', '-fsyntax-only', 
            '-I.', '-I./Core', '-I./src', 
            str(file_path)
        ], capture_output=True, text=True, cwd='/home/runner/work/CyberRanger/CyberRanger')
        
        return {
            'valid': result.returncode == 0,
            'errors': result.stderr,
            'warnings': result.stdout
        }
    except Exception as e:
        return {
            'valid': False,
            'errors': f"Failed to check syntax: {str(e)}",
            'warnings': ''
        }

def check_basic_syntax_issues(file_path):
    """Check for common syntax issues without compiler"""
    issues = []
    
    try:
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            lines = f.readlines()
        
        brace_count = 0
        paren_count = 0
        
        for i, line in enumerate(lines, 1):
            line = line.strip()
            
            # Skip comments and empty lines
            if line.startswith('//') or line.startswith('/*') or not line:
                continue
                
            # Count braces and parentheses
            brace_count += line.count('{') - line.count('}')
            paren_count += line.count('(') - line.count(')')
            
            # Check for common issues
            if line.endswith(',') and not line.startswith('#'):
                issues.append(f"Line {i}: Possible stray comma")
            
            if ';;' in line:
                issues.append(f"Line {i}: Double semicolon found")
                
            # Check for misplaced else
            if line.strip().startswith('else') and i > 1:
                prev_line = lines[i-2].strip()
                if prev_line.endswith('}'):
                    continue
                else:
                    issues.append(f"Line {i}: Possible misplaced 'else' statement")
        
        # Check final brace/paren balance
        if brace_count != 0:
            issues.append(f"Unbalanced braces: {brace_count}")
        if paren_count != 0:
            issues.append(f"Unbalanced parentheses: {paren_count}")
            
    except Exception as e:
        issues.append(f"Error reading file: {str(e)}")
    
    return issues

def main():
    base_path = '/home/runner/work/CyberRanger/CyberRanger'
    
    print("=== CyberRanger File Integrity and Syntax Checker ===\n")
    
    # Check file integrity
    print("1. Checking file integrity...")
    integrity_report = check_file_integrity(base_path)
    
    source_files = [f for f in integrity_report.keys() if integrity_report[f].get('exists', False)]
    print(f"Found {len(source_files)} source files")
    
    # Check syntax
    print("\n2. Checking syntax...")
    syntax_issues = {}
    
    for file_path in source_files:
        if file_path.endswith(('.cpp', '.h', '.hpp')):
            print(f"Checking {file_path}...")
            
            # Basic syntax issues
            basic_issues = check_basic_syntax_issues(file_path)
            
            # Store results
            syntax_issues[file_path] = {
                'basic_issues': basic_issues,
                'has_issues': len(basic_issues) > 0
            }
    
    # Report results
    print("\n=== RESULTS ===")
    
    total_files = len(source_files)
    files_with_issues = sum(1 for f in syntax_issues.values() if f['has_issues'])
    
    print(f"Files checked: {total_files}")
    print(f"Files with issues: {files_with_issues}")
    print(f"Files without issues: {total_files - files_with_issues}")
    
    if files_with_issues > 0:
        print("\n=== ISSUES FOUND ===")
        for file_path, issues in syntax_issues.items():
            if issues['has_issues']:
                print(f"\n{file_path}:")
                for issue in issues['basic_issues']:
                    print(f"  - {issue}")
    
    # Save integrity report
    report_path = os.path.join(base_path, 'integrity_report.json')
    try:
        with open(report_path, 'w') as f:
            json.dump({
                'integrity': integrity_report,
                'syntax_issues': syntax_issues
            }, f, indent=2)
        print(f"\nDetailed report saved to: {report_path}")
    except Exception as e:
        print(f"Failed to save report: {e}")
    
    return files_with_issues == 0

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)