import { Meta, StoryFn } from '@storybook/react';
import React from 'react';

import { iMovieCard } from './types';
import MovieCard from './MovieCard';

const meta = {
    title: 'components/MovieCard',
    component: MovieCard,
    parameters: {
        layout: "cenetered",
        docs: {
            story: {
                inline: false,
                description: "A MovieCard component", 
                iframeHeight: 400,
            }
        },
    },
    argTypes: {
        title: { control: 'text' },
        genreId: { control: 'number' },
        movieId: { control: 'number' },
        voteAverage: { control: 'number' },
        posterPath: { control: 'text' },
    },
    tags: ['autodocs'],
} as Meta;

export default meta;

const Template: StoryFn<iMovieCard> = (args) => <MovieCard {...args} />;

/**
 * Default story of the MovieCard 
 */
export const Default = Template.bind({});
Default.args = {
    posterPath: "https://image.tmdb.org/t/p/w500/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg",
    title: "Creed III",
    voteAverage: 7.3,
    genreId: 18,
    movieId: 677179,
}