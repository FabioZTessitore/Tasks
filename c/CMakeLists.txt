cmake_minimum_required (VERSION 2.6)

project (Tasks)

set (CMAKE_C_FLAGS "-Wall -ansi -pedantic")

include_directories (includes config)

include_directories (project)
include_directories (projects_list)

add_subdirectory (project)
add_subdirectory (projects_list)

add_executable (Tasks main.c)
target_link_libraries(Tasks Project ProjectsList)
