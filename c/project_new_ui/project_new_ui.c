#include "project_new_ui.h"

void projectNewWin_make(ProjectNewWinPtr pnw, unsigned int height, unsigned int width, unsigned int starty, unsigned int startx)
{
  pnw->width = width;
  pnw->height = height;
  pnw->startx = startx;
  pnw->starty = starty;

  pnw->win = newwin(height, width, starty, startx);
  box(pnw->win, 0 , 0);

  wrefresh(pnw->win);
}
