#include <ncurses.h>
#include <string.h>
#include "projects_list_ui.h"
#include "project.h"

void projectsListWin_make(ProjectsListWinPtr plw, unsigned int height, unsigned int width, unsigned int starty, unsigned int startx)
{
  plw->width = width;
  plw->height = height;
  plw->startx = startx;
  plw->starty = starty;

  plw->win = newwin(height, width, starty, startx);
  box(plw->win, 0 , 0);

  wrefresh(plw->win);
}

void projectsListWin_updateContent(ProjectsListWinPtr plw, ProjectsListPtr pl)
{
  int i;
  int bufSize = plw->width - 2; /* borders */
  char buffer[bufSize];

  for (i = 0; i < pl->size; i++) {
    project_toString(pl->project[i], buffer, 28);
    if (strlen(buffer) >= plw->width - 3) {
      buffer[bufSize - 2] = '.';
      buffer[bufSize - 3] = '.';
      buffer[bufSize - 4] = '.';
    }
    mvwprintw(plw->win, i+1, 1, buffer);
  }
  wrefresh(plw->win);
}
