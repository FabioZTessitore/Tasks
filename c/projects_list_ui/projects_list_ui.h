#ifndef PROJECTS_LIST_UI_H
#define PROJECTS_LIST_UI_H

#include <ncurses.h>
#include "projects_list.h"

struct projectsListWin {
  WINDOW *win;
  unsigned int width;
  unsigned int height;
  unsigned int startx;
  unsigned int starty;
};

typedef struct projectsListWin ProjectsListWin;
typedef struct projectsListWin *ProjectsListWinPtr;

void projectListWin_make(ProjectsListWinPtr plw, unsigned int height, unsigned int width, unsigned int starty, unsigned int startx);
void projectListWin_updateContent(ProjectsListWinPtr plw, ProjectsListPtr pl);

#endif
