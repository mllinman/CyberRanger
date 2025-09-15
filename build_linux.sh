#!/bin/bash
# CyberRanger Linux Build Script

set -e

echo "Building CyberRanger for Linux..."

# Check if Qt6 is available
if ! command -v qt6-config &> /dev/null && ! command -v qmake6 &> /dev/null; then
    echo "Qt6 not found. Installing Qt6 development packages..."
    sudo apt update
    sudo apt install -y qt6-base-dev qt6-base-dev-tools cmake build-essential
fi

# Check if CMake is available
if ! command -v cmake &> /dev/null; then
    echo "CMake not found. Installing CMake..."
    sudo apt install -y cmake
fi

# Clean and create build directory
rm -rf build
mkdir -p build
cd build

# Configure CMake
echo "Configuring CMake..."
cmake .. -DCMAKE_BUILD_TYPE=Release

# Build the project
echo "Building CyberRanger..."
cmake --build . --config Release

# Create release directory
cd ..
mkdir -p release
cp build/CyberRangerWorking release/CyberRanger
chmod +x release/CyberRanger

echo "Build completed successfully!"
echo "Executable located at: release/CyberRanger"
echo ""
echo "To run CyberRanger:"
echo "./release/CyberRanger"