import tweepy
import os
from config import settings 

client = tweepy.Client(consumer_key = settings.API_KEY, consumer_secret = settings.API_SECRET_KEY, access_token = settings.ACCESS_TOKEN, access_token_secret = settings.ACCESS_TOKEN_SECRET)

response = client.create_tweet(text='Hello World')

print(response)

