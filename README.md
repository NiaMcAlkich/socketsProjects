ws://172.17.103.101:3000

to server:
'click' with nothing
'resetClicks' with nothing
'friendlyNameUpdate' with friendlyName:String

listen from server:
'someoneClicked' -> totalClicks, whoClicked
'someoneResetClicks' -> totalClicks, whoClicked
'connectComplete' -> totalClicks

todo:
local map on server for names - add appropriate events
added script for start