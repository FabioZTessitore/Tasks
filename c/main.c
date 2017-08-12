#include <ncurses.h>

#include "version.h"

#include "project.h"
#include "projects_list.h"
#include "projects_list_ui.h"

int main()
{
  ProjectsListWin plw;
  int startx = 3;
  int starty = 5;
  int width = 30;
  int height = 15;

  Project p1, p2;
  project_make(&p1, 1, "Progetto 1");
  project_make(&p2, 2, "Progetto 2 con un nome molto molto lungo");
  ProjectsList pl;
  projectsList_init(&pl);
  projectsList_addProject(&pl, &p1);
  projectsList_addProject(&pl, &p2);

  initscr();
  curs_set(0);
  cbreak();
  noecho();
  keypad(stdscr, TRUE);

  mvprintw(1, 5, "Tasks Manager");
  mvprintw(23, 5, "Press F2 to quit");
  refresh();

  projectsListWin_make(&plw, height, width, starty, startx);
  projectsListWin_updateContent(&plw, &pl);

  int c;
  while ( (c=getch()) != KEY_F(2) ) {
    switch (c) {
      case 'I':
        mvprintw(10, 37, "Pressed I");
        break;
      default:
        mvprintw(10, 37, "Ma che ...");
        break;
    }
    refresh();
  }

  endwin();

  return 0;
}
