# 6.0001/6.00 Problem Set 5 - RSS Feed Filter
# Name:
# Collaborators:
# Time:

import feedparser
import string
import time
import threading
from project_util import translate_html
from mtTkinter import *
from datetime import datetime
import pytz


#-----------------------------------------------------------------------

#======================
# Code for retrieving and parsing
# Google and Yahoo News feeds
# Do not change this code
#======================

def process(url):
    """
    Fetches news items from the rss url and parses them.
    Returns a list of NewsStory-s.
    """
    feed = feedparser.parse(url)
    entries = feed.entries
    ret = []
    for entry in entries:
        guid = entry.guid
        title = translate_html(entry.title)
        link = entry.link
        description = translate_html(entry.description)
        pubdate = translate_html(entry.published)

        try:
            pubdate = datetime.strptime(pubdate, "%a, %d %b %Y %H:%M:%S %Z")
            pubdate.replace(tzinfo=pytz.timezone("GMT"))
          #  pubdate = pubdate.astimezone(pytz.timezone('EST'))
          #  pubdate.replace(tzinfo=None)
        except ValueError:
            pubdate = datetime.strptime(pubdate, "%a, %d %b %Y %H:%M:%S %z")

        newsStory = NewsStory(guid, title, description, link, pubdate)
        ret.append(newsStory)
    return ret

#======================
# Data structure design
#======================

# Problem 1

# TODO: NewsStory
class NewsStory():
    def __init__(self, guid, title, description, link, pubdate):
        self.guid, self.title, self.description, self.link, self.pubdate = guid, title, description, link, pubdate

    def get_guid(self):
        return self.guid

    def get_title(self):
        return self.title

    def get_description(self):
        return self.description

    def get_link(self):
        return self.link

    def get_pubdate(self):
        return self.pubdate


#======================
# Triggers
#======================

class Trigger(object):
    def evaluate(self, story):
        """
        Returns True if an alert should be generated
        for the given news item, or False otherwise.
        """
        # DO NOT CHANGE THIS!
        raise NotImplementedError

# PHRASE TRIGGERS

# Problem 2
# TODO: PhraseTrigger
class PhraseTrigger(Trigger):
    def __init__(self, phrase):
        self.phrase = phrase 


    def is_phrase_in(self, text):
        DEBUG = False

        text = text.lower()
        phrase = self.phrase.lower()
        phrase_splits = phrase.split()
        if DEBUG: print("\n")
        if DEBUG: print("phrase:", phrase)
        if DEBUG: print("text:", text)

        text_splits = []
        word = ""
        for ch in text:
            if ch.isalpha():
                word += ch
            elif word:
                text_splits.append(word)
                word = ""
        # append last word if text ends with a letter
        if word:
            text_splits.append(word)
            
        if DEBUG: print("text_splits:", text_splits )

        i=0
        comparing = False
        start_compare_i = -1
        comparing_i = -1
        while i < len(text_splits) :
            if DEBUG: print("i", i)
            if comparing:
                if comparing_i+i < len(text_splits) and text_splits[comparing_i+i] == phrase_splits[comparing_i]:
                    comparing_i +=1
                    if comparing_i == len(phrase_splits):
                        if DEBUG: print("return", True)
                        return True
                else:
                    comparing = False
                    comparing_i = -1
                    i = start_compare_i + 1 
                    continue
            elif text_splits[i] == phrase_splits[0]:
                comparing = True
                start_compare_i = i
                comparing_i = 1
                
            else:
                i+=1   
                
        if DEBUG: print("return", False)
        return False



# Problem 3
# TODO: TitleTrigger
class TitleTrigger(PhraseTrigger):
    def __init__(self, phrase):
        super().__init__(phrase)

    def evaluate(self, story):
        return super().is_phrase_in(story.get_title())
    

# Problem 4
# TODO: DescriptionTrigger
class DescriptionTrigger(PhraseTrigger):
    def __init__(self, phrase):
        super().__init__(phrase)
    
    def evaluate(self, story):
        return super().is_phrase_in(story.get_description())

# TIME TRIGGERS

# Problem 5
# TODO: TimeTrigger
# Constructor:
#        Input: Time has to be in EST and in the format of "%d %b %Y %H:%M:%S".
#        Convert time from string to a datetime before saving it as an attribute.
class TimeTrigger(Trigger):
    def __init__(self, EST_time_str):

        pattern = "%d %b %Y %H:%M:%S"
        self.tirgger_dt = datetime.strptime(EST_time_str, pattern)


# Problem 6
# TODO: BeforeTrigger and AfterTrigger
class BeforeTrigger(TimeTrigger):
    def __init__(self, EST_time_str):
        super().__init__(EST_time_str)
    
    def evaluate(self, story):
        DEBUG = False
        if DEBUG: print("BeforeTrigger", "evaluate")

        story_datetime = story.get_pubdate()

        # normalize story_datetime to naive
        if story_datetime.tzinfo is not None:
            story_datetime = story_datetime.replace(tzinfo=None)
        if DEBUG: print("story_datetime:", story_datetime)
        if DEBUG: print("self.tirgger_dt:", self.tirgger_dt)
        return story_datetime < self.tirgger_dt

class AfterTrigger(TimeTrigger):
    def __init__(self, EST_time_str):
        super().__init__(EST_time_str)
    
    def evaluate(self, story):
        DEBUG = False
        if DEBUG: print("AfterTrigger", "evaluate")
        story_datetime = story.get_pubdate()

        # normalize story_datetime to naive
        if story_datetime.tzinfo is not None:
            story_datetime = story_datetime.replace(tzinfo=None)
        if DEBUG: print("story_datetime:", story_datetime)
        if DEBUG: print("self.tirgger_dt:", self.tirgger_dt)
        return story_datetime > self.tirgger_dt

# COMPOSITE TRIGGERS

# Problem 7
# TODO: NotTrigger
class NotTrigger(Trigger):
    def __init__(self, T):
        self.T = T
    def evaluate(self, x):
        return not self.T.evaluate(x)

# Problem 8
# TODO: AndTrigger
class AndTrigger(Trigger):
    def __init__(self, T1, T2):
        self.T1 = T1
        self.T2 = T2
        
    def evaluate(self, x):
        return self.T1.evaluate(x) and self.T2.evaluate(x)

# Problem 9
# TODO: OrTrigger

class OrTrigger(Trigger):
    def __init__(self, T1, T2):
        self.T1 = T1
        self.T2 = T2
        
    def evaluate(self, x):
        return self.T1.evaluate(x) or self.T2.evaluate(x)
#======================
# Filtering
#======================

# Problem 10
def filter_stories(stories, triggerlist):
    """
    Takes in a list of NewsStory instances.

    Returns: a list of only the stories for which a trigger in triggerlist fires.
    """
    # TODO: Problem 10
    # This is a placeholder
    # (we're just returning all the stories, with no filtering)
    output = []
    for story in stories:
        for T in triggerlist:
            if T.evaluate(story):
                output.append(story)
                break
    return output



#======================
# User-Specified Triggers
#======================
# Problem 11
def read_trigger_config(filename):
    """
    filename: the name of a trigger configuration file

    Returns: a list of trigger objects specified by the trigger configuration
        file.
    """
    # We give you the code to read in the file and eliminate blank lines and
    # comments. You don't need to know how it works for now!
    trigger_file = open(filename, 'r')
    lines = []
    for line in trigger_file:
        line = line.rstrip()
        if not (len(line) == 0 or line.startswith('//')):
            lines.append(line)

    # TODO: Problem 11
    # line is the list of lines that you need to parse and for which you need
    # to build triggers

    print(lines) # for now, print it so you see what it contains!
    trigger_list = []
    created_triggers = {}
    for line in lines:
        params = line.split(",")
        print(params)
        cmd = params[0]
        
        match cmd:
            case "ADD":
                for trigger in params[1:]:
                    print("ading:", trigger)
                    trigger_list.append(created_triggers[trigger])
                
            case _: # create trigger tx
                create_trigger_name = cmd
                trigger_type = params[1] 
                arg1= params[2]
                
                match trigger_type:
                    case "TITLE":
                        created_trigger = TitleTrigger(arg1)
                    case "DESCRIPTION":
                        created_trigger = DescriptionTrigger(arg1)
                    case "AFTER":
                        created_trigger = AfterTrigger(arg1)
                    case "BEFORE":
                        created_trigger = BeforeTrigger(arg1)
                    case "NOT":
                        created_trigger = NotTrigger(created_triggers[arg1])   # arg1 itself is another Trigger
                    case "AND":
                        created_trigger = AndTrigger(created_triggers[arg1], created_triggers[params[3]])
                    case "OR":
                        created_trigger = OrTrigger(created_triggers[arg1], created_triggers[params[3]])
                    case _:
                        raise ValueError(f"Unknown trigger type: {trigger_type}")
        
                created_triggers[create_trigger_name] = created_trigger
                
    return trigger_list 


SLEEPTIME = 120 #seconds -- how often we poll

def main_thread(master):
    # A sample trigger list - you might need to change the phrases to correspond
    # to what is currently in the news
    try:
        t1 = TitleTrigger("election")
        t2 = DescriptionTrigger("Trump")
        t3 = DescriptionTrigger("Clinton")
        t4 = AndTrigger(t2, t3)
        triggerlist = [t1, t4]
        print(triggerlist)

        # Problem 11
        # TODO: After implementing read_trigger_config, uncomment this line 
        triggerlist = read_trigger_config('triggers.txt')
        print(triggerlist)

        # HELPER CODE - you don't need to understand this!
        # Draws the popup window that displays the filtered stories
        # Retrieves and filters the stories from the RSS feeds
        frame = Frame(master)
        frame.pack(side=BOTTOM)
        scrollbar = Scrollbar(master)
        scrollbar.pack(side=RIGHT,fill=Y)

        t = "Google & Yahoo Top News"
        title = StringVar()
        title.set(t)
        ttl = Label(master, textvariable=title, font=("Helvetica", 18))
        ttl.pack(side=TOP)
        cont = Text(master, font=("Helvetica",14), yscrollcommand=scrollbar.set)
        cont.pack(side=BOTTOM)
        cont.tag_config("title", justify='center')
        button = Button(frame, text="Exit", command=root.destroy)
        button.pack(side=BOTTOM)
        guidShown = []
        def get_cont(newstory):
            if newstory.get_guid() not in guidShown:
                cont.insert(END, newstory.get_title()+"\n", "title")
                cont.insert(END, "\n---------------------------------------------------------------\n", "title")
                cont.insert(END, newstory.get_description())
                cont.insert(END, "\n*********************************************************************\n", "title")
                guidShown.append(newstory.get_guid())

        while True:

            print("Polling . . .", end=' ')
            # Get stories from Google's Top Stories RSS news feed
            stories = process("http://news.google.com/news?output=rss")

            # Get stories from Yahoo's Top Stories RSS news feed
            stories.extend(process("http://news.yahoo.com/rss/topstories"))

            stories = filter_stories(stories, triggerlist)

            list(map(get_cont, stories))
            scrollbar.config(command=cont.yview)


            print("Sleeping...")
            time.sleep(SLEEPTIME)

    except Exception as e:
        print(e)


if __name__ == '__main__':
    root = Tk()
    root.title("Some RSS parser")
    t = threading.Thread(target=main_thread, args=(root,))
    t.start()
    root.mainloop()

