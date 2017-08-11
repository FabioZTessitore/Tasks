#ifndef PROJECTS_LIST
#define PROJECTS_LIST

#include "project.h"

#define PROJECTS_MAX 25

struct projectsList {
  unsigned int size;
  ProjectPtr project[PROJECTS_MAX];
};

typedef struct projectsList ProjectsList;
typedef struct projectsList *ProjectsListPtr;

void projectsList_init(ProjectsListPtr pl);
void projectsList_addProject(ProjectsListPtr pl, const ProjectPtr p);
void projectsList_dump(ProjectsListPtr pl);
void projectsList_remove(ProjectsListPtr pl, const unsigned int index);

#endif
