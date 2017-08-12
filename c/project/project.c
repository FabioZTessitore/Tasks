#include <stdio.h>
#include <string.h>
#include "project.h"

void project_make(ProjectPtr p, unsigned int id, const char *name)
{
  p->id = id;
  project_set_name(p, name);
}

void project_set_name(ProjectPtr p, const char *name)
{
  strncpy(p->name, name, PROJECTS_NAME_LEN);
  p->name[PROJECTS_NAME_LEN-1] = '\0';
}

void project_dump(ProjectPtr p)
{
  printf("ID: %d\t", p->id);
  printf("Name: %s\n", p->name);
}

void project_toString(ProjectPtr p, char *buffer, int bufSize)
{
  char localBuffer[128];
  sprintf(localBuffer, "%d) %s", p->id, p->name);

  strncpy(buffer, localBuffer, bufSize);
  buffer[bufSize-1] = '\0';
}
