#include <stdio.h>
#include "projects_list.h"
#include "project.h"

void projectsList_init(ProjectsListPtr pl)
{
  pl->size = 0;
}

void projectsList_addProject(ProjectsListPtr pl, const ProjectPtr p)
{
  if (pl->size >= PROJECTS_MAX) return;

  int last = pl->size;
  pl->project[last] = p;
  pl->size++;
}

void projectsList_dump(ProjectsListPtr pl)
{
  int i;

  if (pl->size <= 0) {
    printf("ProjectsList empty\n");
    return;
  }

  printf("ProjectsList Size: %d\n", pl->size);
  for (i = 0; i < pl->size; i++) {
    project_dump(pl->project[i]);
  }
}

void projectsList_remove(ProjectsListPtr pl, const unsigned int index)
{
  if (index >= pl->size) return;

  int i;

  for (i = index; i < pl->size - 1; i++) {
    pl->project[i] = pl->project[i+1];
  }
  pl->size--;
}
