#include <stdio.h>
#include "version.h"
#include "config.h"
#include "project.h"
#include "projects_list.h"

int main()
{
  puts("TASKS");

  printf("VERSION %s\n", VERSION);
  printf("API %d\n", API);

  printf("\n\nProject:\n");
  Project test;
  project_make(&test, 1, "TEST");
  project_dump(&test);
  project_set_name(&test, "test test");
  project_dump(&test);

  Project test2;
  project_make(&test2, 2, "TEST2");

  ProjectsList pl;
  projectsList_init(&pl);
  projectsList_addProject(&pl, &test);
  projectsList_addProject(&pl, &test2);
  printf("\n\nProjectsList:\n");
  projectsList_dump(&pl);
  projectsList_remove(&pl, 0);
  projectsList_dump(&pl);

  return 0;
}
