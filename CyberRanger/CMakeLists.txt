cmake_minimum_required(VERSION 3.16)
project(ModernPentestSuite LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

find_package(Qt6 COMPONENTS Core Widgets Gui Network Charts REQUIRED)

include_directories(include)

file(GLOB SOURCES "src/*.cpp")
file(GLOB HEADERS "include/*.h")

qt_standard_project_setup()
add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})

target_link_libraries(${PROJECT_NAME} Qt6::Core Qt6::Widgets Qt6::Gui Qt6::Network Qt6::Charts)

if(WIN32)
    target_link_libraries(${PROJECT_NAME} wlanapi bthprops iphlpapi)
endif()

# Add Linux libraries if needed
if(UNIX AND NOT APPLE)
    find_package(PkgConfig REQUIRED)
    pkg_check_modules(LIBNL REQUIRED libnl-3.0 libnl-genl-3.0)
    target_include_directories(${PROJECT_NAME} PRIVATE ${LIBNL_INCLUDE_DIRS})
    target_link_libraries(${PROJECT_NAME} ${LIBNL_LIBRARIES})
    target_compile_options(${PROJECT_NAME} PRIVATE ${LIBNL_CFLAGS_OTHER})
endif()