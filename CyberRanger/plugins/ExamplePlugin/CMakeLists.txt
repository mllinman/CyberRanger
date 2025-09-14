cmake_minimum_required(VERSION 3.16)
project(ExamplePlugin)

set(CMAKE_CXX_STANDARD 17)
find_package(Qt6 REQUIRED COMPONENTS Core Widgets)

add_library(ExamplePlugin SHARED ExamplePlugin.cpp)
target_link_libraries(ExamplePlugin Qt6::Core Qt6::Widgets)
target_include_directories(ExamplePlugin PRIVATE ../../Core)
set_target_properties(ExamplePlugin PROPERTIES PREFIX "")
set_target_properties(ExamplePlugin PROPERTIES OUTPUT_NAME "ExamplePlugin")
set_target_properties(ExamplePlugin PROPERTIES SUFFIX ".plugin")
target_compile_definitions(ExamplePlugin PRIVATE EXAMPLEPLUGIN_LIBRARY)