cmake_minimum_required(VERSION 3.16.0)
project(CyberRangerWorking LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 COMPONENTS Core Widgets Network REQUIRED)

# Check for libpcap (optional)
find_library(PCAP_LIBRARY pcap)
if(PCAP_LIBRARY)
    message(STATUS "Found libpcap: ${PCAP_LIBRARY}")
    add_definitions(-DHAVE_PCAP)
else()
    message(WARNING "libpcap not found - packet capture will use simulation mode")
endif()

file(GLOB RESOURCES "*.qrc")

add_executable(${PROJECT_NAME} simple_main.cpp ${RESOURCES})

target_link_libraries(${PROJECT_NAME} Qt6::Core Qt6::Widgets Qt6::Network)

if(PCAP_LIBRARY)
    target_link_libraries(${PROJECT_NAME} ${PCAP_LIBRARY})
endif()