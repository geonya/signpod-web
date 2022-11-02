import { FC, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import type { DropzoneOptions, FileWithPath } from 'react-dropzone'
import { useDropzone } from 'react-dropzone'
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemText,
  Tooltip,
  Typography,
} from '@mui/material'
import { Close } from '@mui/icons-material'
import { bytesToSize } from '../utils/bytes-to-size'
import Image from 'next/image'
import { DroppedFile } from './works/work-create-form'

interface FileDropzoneProps extends DropzoneOptions {
  files?: DroppedFile[]
  onRemove?: (file: DroppedFile) => void
  onRemoveAll?: () => void
  onUpload?: () => void
}

export const FileDropzone: FC<FileDropzoneProps> = ({
  // Own props
  files = [],
  onRemove,
  onRemoveAll,
  onUpload,
  // DropzoneOptions props
  accept,
  disabled,
  getFilesFromEvent,
  maxSize,
  minSize,
  multiple,
  maxFiles,
  onDragEnter,
  onDragLeave,
  onDragOver,
  onDrop,
  onDropAccepted,
  onDropRejected,
  onFileDialogCancel,
  onFileDialogOpen,
  useFsAccessApi,
  autoFocus,
  preventDropOnDocument,
  noClick,
  noKeyboard,
  noDrag,
  noDragEventsBubbling,
  onError,
  validator,
  ...other
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    minSize,
    onDrop,
  })

  return (
    <div {...other}>
      <Box
        sx={{
          alignItems: 'center',
          border: 1,
          borderRadius: 1,
          borderStyle: 'dashed',
          borderColor: 'divider',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          outline: 'none',
          p: 6,
          ...(isDragActive && {
            backgroundColor: 'action.active',
            opacity: 0.5,
          }),
          '&:hover': {
            backgroundColor: 'action.hover',
            cursor: 'pointer',
            opacity: 0.5,
          },
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <Box
          sx={{
            '& img': {
              width: 100,
            },
          }}
        >
          <Image
            alt='Select file'
            src='/static/add_file.svg'
            width={90}
            height={90}
          />
        </Box>
        <Box sx={{ p: 2 }}>
          <Typography variant='h6'>{`파일 업로드`}</Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant='body1'>
              <Link underline='always'>탐색기</Link>에서 파일 찾아보기
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Upload File Preview */}
      {files.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <List>
            {files.map((file, i) => (
              <ListItem
                key={i}
                sx={{
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  '& + &': {
                    mt: 1,
                  },
                }}
              >
                <Image
                  src={file.url!}
                  width={100}
                  height={100}
                  alt={file.file.path}
                />
                {/* <ListItemIcon>
                  <ContentCopy fontSize='small' />
                </ListItemIcon> */}
                <ListItemText
                  primary={file.file.name}
                  primaryTypographyProps={{
                    color: 'textPrimary',
                    variant: 'subtitle2',
                  }}
                  secondary={bytesToSize(file.file.size)}
                  secondaryTypographyProps={{
                    variant: 'caption',
                  }}
                  sx={{ ml: 2 }}
                />

                <Tooltip title='Remove'>
                  <IconButton edge='end' onClick={() => onRemove!(file)}>
                    <Close fontSize='small' />
                  </IconButton>
                </Tooltip>
              </ListItem>
            ))}
          </List>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
            }}
          >
            <Button onClick={onRemoveAll} size='small' type='button'>
              모두 지우기
            </Button>
          </Box>
        </Box>
      )}
    </div>
  )
}

FileDropzone.propTypes = {
  files: PropTypes.array,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  onUpload: PropTypes.func,
  // @ts-ignore
  accept: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  disabled: PropTypes.bool,
  getFilesFromEvent: PropTypes.func,
  maxFiles: PropTypes.number,
  maxSize: PropTypes.number,
  minSize: PropTypes.number,
  noClick: PropTypes.bool,
  noDrag: PropTypes.bool,
  noDragEventsBubbling: PropTypes.bool,
  noKeyboard: PropTypes.bool,
  onDrop: PropTypes.func,
  onDropAccepted: PropTypes.func,
  onDropRejected: PropTypes.func,
  onFileDialogCancel: PropTypes.func,
  preventDropOnDocument: PropTypes.bool,
}
