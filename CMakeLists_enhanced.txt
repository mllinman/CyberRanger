cmake_minimum_required(VERSION 3.16.0)
project(CyberRangerPro LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTORCC ON)

find_package(Qt6 COMPONENTS Core Widgets REQUIRED)

file(GLOB RESOURCES "*.qrc")

add_executable(${PROJECT_NAME} enhanced_main.cpp ${RESOURCES})

target_link_libraries(${PROJECT_NAME} Qt6::Core Qt6::Widgets)

# Set output directory
set_target_properties(${PROJECT_NAME} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}
)