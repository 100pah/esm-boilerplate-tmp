#!/usr/bin/env python3

import shutil
import os
import pathlib


DEST_BASE_DIR_LIST = [
  '../ts-webpack4',
  '../ts-webpack5',
  '../ts-rollup',
  '../vue-ec',
]

TPL_BASE_DIR = os.path.join(os.path.dirname(__file__), '..')


def del_file_or_directory(target_path):
  print('Delete %s' % (target_path))
  if os.path.isdir(target_path):
    assert len(pathlib.Path(target_path).resolve().parents) > 1
    shutil.rmtree(target_path)
  elif os.path.isfile(target_path):
    os.remove(target_path)


def copy_file_or_directory(src_path, dest_path):
  print('Copy %s to %s' % (src_path, dest_path))
  if os.path.isdir(src_path):
    del_file_or_directory(dest_path)
    shutil.copytree(src_path, dest_path)
  else:
    shutil.copy(src_path, dest_path)


def main():
  def single_cp(src_relative_path, dest_proj_relative_path):
    cp_src = os.path.normpath(os.path.join(TPL_BASE_DIR, src_relative_path))
    cp_dest = os.path.normpath(os.path.join(TPL_BASE_DIR, dest_proj_relative_path, src_relative_path))
    print('Copy {} to {}'.format(cp_src, cp_dest))
    copy_file_or_directory(cp_src, cp_dest)

  for dest_base_dir in DEST_BASE_DIR_LIST:
    single_cp('test', dest_base_dir)
    single_cp('scripts', dest_base_dir)

  print('Done.')


__all__ = ['main']

if __name__ == '__main__':
  main()
