#include <ncurses.h>

#include "version.h"

#include "project.h"
#include "projects_list.h"
#include "projects_list_ui.h"
#include "project_new_ui.h"

void update(ProjectsListWinPtr plw, ProjectsListPtr pl);

int main()
{
  ProjectsListWin plw;
  ProjectNewWin pnw;

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
  start_color();
  init_pair(1, COLOR_GREEN, COLOR_BLACK);
	init_pair(2, COLOR_RED, COLOR_BLACK);

  clear();
  refresh();
  update(&plw, &pl);

  int c;
  while ( (c=getch()) != KEY_F(2) ) {
    switch (c) {
      case 'I':
        projectNewWin_make(&pnw, &pl);
        break;
      default:
        mvprintw(20, 37, "Ma che ...");
        break;
    }
    clear();
    refresh();
    update(&plw, &pl);
  }

  endwin();

  return 0;
}

void update(ProjectsListWinPtr plw, ProjectsListPtr pl)
{
  mvprintw(1, 5, "Tasks Manager");
  mvprintw(23, 5, "Press F2 to quit");

  projectsListWin_make(plw, 15, 30, 5, 3);
  projectsListWin_updateContent(plw, pl);
}
