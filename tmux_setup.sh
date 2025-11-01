#!/bin/bash

SESH="Homerun_Project"

if tmux has-session -t "$SESH" 2>/dev/null; then
    echo "Reattaching to existing tmux session: $SESH"
    tmux attach -t "$SESH"

else
    echo "Create new session named $SESH"

    tmux new-session -d -s "$SESH" -n "vim" 
    tmux new-window -t "$SESH" -n "bash"

    tmux attach -t "$SESH"
fi

