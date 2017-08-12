#ifndef PROJECT_NEW_UI_H
#define PROJECT_NEW_UI_H

#include <ncurses.h>

struct projectNewWin {
  WINDOW *win;
  unsigned int width;
  unsigned int height;
  unsigned int startx;
  unsigned int starty;
};

typedef struct projectNewWin ProjectNewWin;
typedef struct projectNewWin *ProjectNewWinPtr;

void projectNewWin_make(ProjectNewWinPtr pnw, unsigned int height, unsigned int width, unsigned int starty, unsigned int startx);

#endif