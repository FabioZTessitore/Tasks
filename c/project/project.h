#ifndef PROJECT_H
#define PROJECT_H

#define PROJECTS_NAME_LEN 30

struct project {
  unsigned int id;
  char name[PROJECTS_NAME_LEN];
};

typedef struct project Project;
typedef struct project *ProjectPtr;

void project_make(ProjectPtr p, unsigned int id, const char *name);
void project_set_name(ProjectPtr p, const char *name);
void project_dump(ProjectPtr p);
void project_toString(ProjectPtr p, char *buffer, int bufSize);

#endif
