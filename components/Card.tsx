import { Card as AntDesignCard, Tag } from 'antd';
import clsx from 'clsx';
import dataFormat from 'dateformat';
import Image from 'next/image';
import React from 'react';
import { Colors } from '../config';

interface BaseProps {
  title: string;
  description: string;
  onClick?: VoidFunction;
}

interface ProjectProps extends BaseProps {
  banner: string;
}

const dimensions = 'flex-shrink-0 w-72 lg:w-80 mr-2 rounded cursor-pointer';
const border = 'border border-light dark:border-dark';
const color = 'dark:bg-dark dark:text-white';

function Project(props: ProjectProps): React.ReactElement {
  const { title, banner, description, onClick } = props;

  return (
    <AntDesignCard
      className={clsx(dimensions, border, color)}
      onClick={onClick}
      cover={
        <Image
          loading='eager'
          src={banner}
          height={240}
          width={400}
          objectFit='cover'
          alt={title}
        />
      }
    >
      <div className='flex flex-col pt-2 pb-4 px-6'>
        <span className='text-lg font-bold'>{title}</span>
        <p className='mt-1 text-sm font-light line-clamp-2'>{description}</p>
      </div>
    </AntDesignCard>
  );
}

interface ArticleProps extends BaseProps {
  url: string;
  tags: string[];
  publishedAt: string;
}

function Article(props: ArticleProps): React.ReactElement {
  const { title, description, url, tags, publishedAt } = props;

  const date = dataFormat(new Date(publishedAt), 'mmm dS, yyyy');

  function renderTags(tag: string): React.ReactNode {
    return <Tag color={Colors[tag]}>{tag}</Tag>;
  }

  return (
    <a target='_blank' aria-label={title} href={url} rel='noopener noreferrer'>
      <AntDesignCard
        className={clsx(dimensions, border, color, 'cursor-pointer')}
      >
        <div className='flex flex-col py-4 px-6'>
          <span className='text-lg font-bold truncate text-ellipsis'>
            {title}
          </span>
          <div className='flex my-2'>
            {React.Children.toArray(tags.map(renderTags))}
          </div>
          <span className='text-sm font-light line-clamp-2'>{description}</span>
          <p className='text-xs font-light mt-2 text-right'>{date}</p>
        </div>
      </AntDesignCard>
    </a>
  );
}

interface VideoProps {
  id: string;
}

function Video(props: VideoProps): React.ReactElement {
  const { id } = props;

  return (
    <AntDesignCard className={clsx(dimensions, border, color, 'h-40')}>
      <iframe
        className={clsx(dimensions, 'h-40')}
        src={`https://www.youtube.com/embed/${id}`}
        title='YouTube video player'
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
      />
    </AntDesignCard>
  );
}

export const Card = {
  Project,
  Article,
  Video,
};
