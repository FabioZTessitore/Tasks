#include <ncurses.h>
#include "project.h"
#include "project_new_ui.h"

void populateWindow(ProjectNewWinPtr pnw);
void doModal(ProjectNewWinPtr pnw, ProjectsListPtr pl);

void projectNewWin_make(ProjectNewWinPtr pnw, ProjectsListPtr pl)
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
  wrefresh(pnw->win);

  doModal(pnw, pl);

  delwin(pnw->win);
}

void populateWindow(ProjectNewWinPtr pnw)
{
  wattron(pnw->win, A_BOLD);
  mvwprintw(pnw->win, 1, 3, "Insert a New Project");
  wattroff(pnw->win, A_BOLD);
  mvwprintw(pnw->win, 3, 3, "Project Name: ");
  mvwprintw(pnw->win, 5, 3, "Press S to Create a New Project");
  mvwchgat(pnw->win, 5, 9, 1, A_BOLD, 1, NULL);
  mvwprintw(pnw->win, 6, 3, "F3 to Cancel");
  mvwchgat(pnw->win, 6, 3, 2, A_BOLD, 2, NULL);
}

void doModal(ProjectNewWinPtr pnw, ProjectsListPtr pl)
{
  int c;
  int bufSize = 128;
  char buffer[bufSize];
  int i = 0;

  wmove(pnw->win, 3, 17);

  while ( i < bufSize-1 && (c=getch()) != 'S' && c != KEY_F(3)) {
    if (c != 10) {
      buffer[i++] = c;
      waddch(pnw->win, c);
      wrefresh(pnw->win);
    }
  }
  buffer[i] = '\0';

  if (c == 'S') {
    Project p;
    project_make(&p, 0, buffer);
    projectsList_addProject(pl, &p);
  }
}
