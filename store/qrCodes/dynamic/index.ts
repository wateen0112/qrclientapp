import { defineStore } from 'pinia';
import { DynamicMp3Dto } from '~/api/dto/website/DynamicMp3';
import { CauponDto } from '~/api/dto/website/Caupon';
import { useApi } from '~/composables/useApi';
import { useQrStore } from "@/store/qrCodes/qr";

import { QrDynamicController } from '~/api/endpoints/qrDynamic';
const api = useApi ();
