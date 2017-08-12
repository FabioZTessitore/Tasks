cmake_minimum_required (VERSION 2.6)

project (Tasks)

set (CMAKE_C_FLAGS "-Wall -ansi -pedantic")

include_directories (includes config)

include_directories (project)
include_directories (projects_list)
include_directories (projects_list_ui)

add_subdirectory (project)
add_subdirectory (projects_list)
add_subdirectory (projects_list_ui)

find_package(Curses REQUIRED)
include_directories(${CURSES_INCLUDE_DIR})

add_executable (Tasks main.c)
target_link_libraries(Tasks ${CURSES_LIBRARIES} Project ProjectsList ProjectsListUI)
