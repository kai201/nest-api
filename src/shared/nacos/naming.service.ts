import { Inject, Injectable, Optional } from '@nestjs/common';
import { NacosNamingClient } from 'nacos';

export class NamingService {
  constructor(private conn: NacosNamingClient) {}
}
