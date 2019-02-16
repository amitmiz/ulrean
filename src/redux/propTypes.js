import PropTypes from 'prop-types';

const FileType = PropTypes.shape({
  key: PropTypes.string,
  ext: PropTypes.string,
  name: PropTypes.string,
  contents: PropTypes.string,
  head: PropTypes.string,
  tail: PropTypes.string
});

export const MarkdownRemark = PropTypes.shape({
  html: PropTypes.string,
  frontmatter: PropTypes.shape({
    title: PropTypes.string,
    block: PropTypes.string,
    superBlock: PropTypes.string
  })
});

export const StageNode = PropTypes.shape({
  block: PropTypes.string,
  stageType: PropTypes.number,
  dashedName: PropTypes.string,
  description: PropTypes.string,
  files: PropTypes.shape({
    indexhtml: FileType,
    indexjs: FileType
  }),
  fields: PropTypes.shape({
    _id: PropTypes.string,
    blockName: PropTypes.string
  }),
  guideUrl: PropTypes.string,
  head: PropTypes.arrayOf(PropTypes.string),
  stageOrder: PropTypes.number,
  instructions: PropTypes.string,
  isBeta: PropTypes.bool,
  isComingSoon: PropTypes.bool,
  isLocked: PropTypes.bool,
  isPrivate: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  order: PropTypes.number,
  required: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      raw: PropTypes.string,
      src: PropTypes.string
    })
  ),
  superOrder: PropTypes.number,
  superBlock: PropTypes.string,
  tail: PropTypes.arrayOf(PropTypes.string),
  time: PropTypes.string,
  title: PropTypes.string,
  videoUrl: PropTypes.string
});

export const AllStageNode = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: StageNode
    })
  )
});

export const AllMarkdownRemark = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: MarkdownRemark
    })
  )
});
