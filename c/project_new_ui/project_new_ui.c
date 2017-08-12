#include <ncurses.h>
#include "project_new_ui.h"

void populateWindow(ProjectNewWinPtr pnw);

void projectNewWin_make(ProjectNewWinPtr pnw)
{
  pnw->width = 41;
  pnw->height = 8;

  int parentWidth, parentHeight;
  getmaxyx(stdscr, parentHeight, parentWidth);

  pnw->startx = (parentWidth - pnw->width) / 2;
  pnw->starty = (parentHeight - pnw->height) / 2;

  pnw->win = newwin(pnw->height, pnw->width, pnw->starty, pnw->startx);
  box(pnw->win, 0 , 0);

  populateWindow(pnw);

  /*modal*/

  wrefresh(pnw->win);
}

void populateWindow(ProjectNewWinPtr pnw)
{
  wattron(pnw->win, A_BOLD);
  mvwprintw(pnw->win, 1, 3, "Insert a New Project");
  wattroff(pnw->win, A_BOLD);
  mvwprintw(pnw->win, 3, 3, "Project Name: ");
  mvwprintw(pnw->win, 5, 3, "Press ENTER to Create a New Project");
  mvwchgat(pnw->win, 5, 9, 6, A_BOLD, 1, NULL);
  mvwprintw(pnw->win, 6, 3, "ESC to Cancel");
  mvwchgat(pnw->win, 6, 3, 3, A_BOLD, 2, NULL);
}
